<template>
    <section class="customer customer-inquiry">
        <div class="title-h1">고객센터</div>
        <customerTab></customerTab>
        <div class="container">
            <div class="sort-wrap">
                <span class="all-items">전체<strong>{{ inquiryList.content.length }}</strong>개</span>
                <button type="button" class="switch-details" @click="switchDetail = !switchDetail">1:1문의</button>
            </div>
            <!-- 1:1 문의 form -->
            <div class="inquiry-form" v-show="switchDetail">
                <ValidationObserver ref="observer" v-slot="{ validate }">
                <form @submit.prevent="submit(validate)" enctype="multipart/form-data">
                    <div class="select-wrap">
                        <select class="input-select" v-model="inquiry.qnaGroup">
                            <option value=""> 문의 유형을 선택하세요</option>
                            <option v-for="type in inquiryList.qnaGroups" :value="type.id" >{{type.label}}</option>
                        </select>
                    </div>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                    <div class="form-line" :class="{ 'invalid': errors.length }">
                        <input type="text" class="form-basic" v-model="inquiry.subject" placeholder="제목을 입력해주세요" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </div>
                    </ValidationProvider>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                    <textarea v-model="inquiry.question" cols="30" rows="10" class="form-basic text-area"
                        placeholder="내용을 입력해주세요"></textarea>
                    </ValidationProvider>
                    <ul class="photo-list">
                        <li v-for = "(fileData, index) in inquiry.files" class="photo-item">
                            <img id="reviewSrc" class="thumbnail" :src="inquiry.fileImages[index]" alt="썸네일">
                            <button type="button" class="btn-delete" @click.prevent="fileDelete(index)"></button>


                        </li>
                        <li class="add-photo" v-show="inquiry.files.length < maxFileCount"><!-- photo-item이 4개 이상이면 display:none-->
                            <label for="upload-file"><input type="file" name="upload-file" id="upload-file"
                                    accept=".gif,.png,.jpg,.jpeg" multiple @change="fileSelect($event)" ></label>
                        </li>
                    </ul>
                    <ul class="dot-list">
                        <li>5MB 이하의 사진 {{maxFileCount}}장까지 첨부 가능</li>
                    </ul>
                    <div class="link-wrap gap">
                        <button type="submit" class="btn btn-primary link-item w-half">저장</button>
                        <button type="button" @click="cancelInquiry" class="btn btn-default link-item w-half">취소</button>
                    </div>
                </form>
                </ValidationObserver>
            </div>
            <!-- 문의 목록 -->
            <div v-if="inquiryList.content.length > 0">
                <ul class="inquiry-content">
                    <li v-for="(item, index) in inquiryList.content" :key="item.id">
                        <!-- 답변 상태 -->
                        <div class="delivery-status-wrap">
                            <p class="status"
                                :class="item.answer != null ? 'answer-completed' : 'answer-waiting'">
                                {{ item.answer != null ? '답변완료' : '답변대기' }}
                            </p>
                        </div>
                        <!-- 사용자 문의 -->
                        <div class="user-writing">
                            <p class="title">
                                <strong class="category">[{{ item.label }}]</strong>
                                <span class="question" v-html="item.subject"></span>
                            </p>
                            <p class="content" v-html="item.question"></p>
                            <ul class="photo-list" v-if="item.files.length > 0" >
                                <li class="photo-item" v-for="(photo, index) in item.files" :key="`photo${index}`" @click="showReviewImage(item.files)">
                                    <img :src="itemImage(photo)" :alt="photo" @error="errorImage"
                                        class="thumbnail">
                                </li>
                            </ul>
                        </div>
                        <div class="admin-answer" v-if="item.answer != null">
                            <p class="administrator">관리자 답변</p>
                            <div class="content" v-html="item.answer.answer"></div>
                            <p class="date">답변일 {{ item.answer.date }}</p>
                        </div>
                    </li>
                </ul>

            </div>
            <!-- 문의 없음 -->
            <div class="no-contents" v-else>
                <img src="~/assets/image/common/img_noQna.png" alt="게시글 없음">
                <p>작성하신 게시글이 없습니다.</p>
            </div>
        </div>
        <reviewImage :showFlag="showImageModal.show" @close="showImageModal.show=false" :imageList="showImageModal.image" ></reviewImage>
        <ui-pagination :current-page="inquiryList.pagination.currentPage" :total-pages="inquiryList.pagination.totalPages" @change="paging"/>
    </section>
</template>
<script>
import reviewImage from "@/components/modal/review-image-modal.vue";

let $s, vm;
export default {
    watchQuery: true,
    name: 'customer-inquiry',
    components: {reviewImage},
    middleware: 'auth',
    async asyncData({$salesonApi, query}) {
        try {

            const {data} = await $salesonApi().qna.getInquiries({page: query.page ?? 1})

            return {
                inquiryList: data
            }

        } catch (e) {
            console.log(e)
        }
    },
    data() {
        return {
            switchDetail: false,
            showModal: false,
            //문의목록
            inquiryList: {
                content: [],
                pagination: [],
                qnaGroups: []
            },
            showImageModal: {
                show: false,
                image: []
            },
            maxFileCount: 4,
            inquiry: {
                subject: "",
                question: "",
                qnaGroup: "",
                files: [],
                fileImages: []

            }
        }
    },
    head() {
        return {
            meta: [
                {hid: 'pageTitle', name: 'pageTitle', content: '고객센터'}
            ]
        }
    },
    beforeCreate() {
        $s = this.$saleson;
        vm = this;
    },
    mounted() {

    },
    methods: {
        paging(page) {
            const query = {
                page: page,
            }
            this.$router.push({path: this.$route.fullPath, query: query});
        },
        showReviewImage(image) {
            this.showImageModal.show = true;
            this.showImageModal.image = image;
        },
        fileSelect(e) {
            let size = 5;
            let limit = 4;
            let extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'pdf'];

            let selectFiles = this.inquiry.files;
            let images = this.inquiry.fileImages;
            let fileList = e.target.files;

            // 파일 첨부 개수 체크
            if (limit < selectFiles.length + fileList.length) {
                $s.alert('사진은 ' + limit + '장까지 첨부 가능합니다.');
                return;
            }

            for (let i = 0; i < fileList.length; i++) {
                let file = fileList[i];
                let fileExt = fileList[i].name;

                // 사이즈 체크
                if (fileExt != "") {
                    if (file.size > (size * 1024 * 1024)) {
                        $s.alert("파일크기는 " + size + "MB 이내로 등록 가능합니다.");
                        return;
                    }
                }

                // 확장자 체크
                fileExt = fileExt.slice(fileExt.indexOf(".") + 1).toLowerCase();
                if (!extensions.includes(fileExt)) {
                    $s.alert("이미지 파일(jpg, png, gif, bmp, jpeg, pdf) 만 등록 가능합니다.");
                    return;
                }
                fileList[i].extension = fileExt;

                // 미리보기 생성
                try {
                    let reader = new FileReader();
                    let self = this;

                    reader.onload = (ie) => {
                        images.push(ie.target.result);
                        self.inquiry.fileImages = images;
                    };

                    selectFiles.push(file);
                    self.inquiry.files = selectFiles;

                    reader.readAsDataURL(file);
                } catch (e) {

                }
            }
        },
        fileDelete(fileIndex) {

            let files = this.inquiry.files;
            let images = this.inquiry.fileImages;

            files.splice(fileIndex, 1);
            images.splice(fileIndex, 1);
        },

        async submit(validate) {
            const isValid = await validate();

            if (!isValid) {
                $s.alert('필수 항목을 입력해 주십시오.');
                return;
            }
            if (this.inquiry.qnaGroup === "") {
                $s.alert("문의 유형을 선택해주세요");
                return;
            }

            $s.confirm("등록하시겠습니까?", async () => {
                try {

                    let formData = new FormData();
                    formData.append('qnaGroup', this.inquiry.qnaGroup);
                    formData.append('subject', this.inquiry.subject);
                    formData.append('question', this.inquiry.question);

                    const files = this.inquiry.files;

                    if (files != null && files.length > 0) {
                        for(let i=0; i<files.length; i++){
                            formData.append('files', files[i]);
                        }
                    }

                    const {data} = await this.$salesonApi().qna.createInquiry(formData);
                    if(data.status === 200) {
                        $s.alert("1:1문의가 작성되었습니다.", () => {
                            location.reload()
                        });
                    }
                } catch (e) {
                    console.log(e);
                    $s.alert(e.message || e)
                }
            })

        },
        cancelInquiry() {
            this.switchDetail = false;
            this.inquiry = {
                subject: "",
                question: "",
                qnaGroup: "",
                files: [],
                fileImages: []
            };
        }

    },
}
</script>
<style lang="scss">
@import '~/assets/scss/pages/customer/customer_main.scss';
</style>
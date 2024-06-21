<template>
  <div>
    <CustomerNotice />
  </div>
</template>

<script>
import CustomerNotice from "~/pages/customer/notice.vue";

export default {
    name:'customer-index',
    components: {
        CustomerNotice
    },
    head(){
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'고객센터'}
            ]
        }
    },
    data() {
        return {
            
        }
    },
}
</script>
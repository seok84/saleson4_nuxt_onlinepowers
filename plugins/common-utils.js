/**
 * 유틸
 *
 * @author skc@onlinepowers.com
 * @date 2024.05.31
 */

import LocalDate from "@/modules/utils/LocalDate";

export default () => {
    /**
     * 문자열이 지정한 문자로 시작되는 지 확인한다.
     * @param prefix
     * @returns {boolean}
     */
    String.prototype.startWith = (prefix) => {
        const regex = new RegExp(`^${prefix}`);
        return regex.test(this);
    };

    /**
     * 문자열이 지정한 문자로 끝나는지 확인한다.
     * @param suffix
     * @returns {boolean}
     */
    String.prototype.endsWith = (suffix) => {
        const regex = new RegExp(`${suffix}$`);
        return regex.test(this);
    };


    /**
     * 문자열이 날짜인 경우 일 수를 더한 날짜를 확인한다.
     * @param days
     * @returns {string}
     */
    String.prototype.plusDays = (days) => {
        try {
            const localDate = new LocalDate(this);
            const newDate = localDate.plusDays(days);
            return newDate.toString('-');
        } catch (error) {
            throw new Error("Invalid date string format.");
        }
    };

    /**
     * 문자열 포맷
     * @param days
     * @returns {string}
     */
    String.prototype.formatNumber = (number) => {
        try {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } catch (error) {
            return number;
        }
    }
};
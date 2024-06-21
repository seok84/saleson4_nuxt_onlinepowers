export default class LocalDate {
    constructor(date) {
        if (date instanceof Date && !isNaN(date)) {
            this.date = date;
        } else if (typeof date === "string") {
            const parsedDate = this.parseDateString(date);
            if (parsedDate) {
                this.date = parsedDate;
            } else {
                throw new Error("Invalid date string.");
            }
        } else {
            this.date = new Date();
        }
    }

    static currentDate() {
        return new LocalDate();
    }

    static fromDate(year, month, dayOfMonth) {
        return new LocalDate(new Date(year, month - 1, dayOfMonth));
    }

    static fromString(dateString) {
        return new LocalDate(dateString);
    }

    static fromTimestamp(timestamp) {
        return new LocalDate(new Date(timestamp));
    }

    parseDateString(dateString) {
        const parts = dateString.split("-");
        if (parts.length !== 3) return null;
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const day = parseInt(parts[2]);
        if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
        return new Date(year, month, day);
    }

    minusDays(days) {
        return new LocalDate(new Date(this.date.getTime() - (days * 24 * 60 * 60 * 1000)));
    }

    minusMonths(months) {
        const newDate = new Date(this.date);
        newDate.setMonth(newDate.getMonth() - months);
        return new LocalDate(newDate);
    }

    minusYears(years) {
        const newDate = new Date(this.date);
        newDate.setFullYear(newDate.getFullYear() - years);
        return new LocalDate(newDate);
    }

    plusDays(days) {
        return new LocalDate(new Date(this.date.getTime() + (days * 24 * 60 * 60 * 1000)));
    }

    plusMonths(months) {
        const newDate = new Date(this.date);
        newDate.setMonth(newDate.getMonth() + months);
        return new LocalDate(newDate);
    }

    plusYears(years) {
        const newDate = new Date(this.date);
        newDate.setFullYear(newDate.getFullYear() + years);
        return new LocalDate(newDate);
    }

    getDateArray() {
        const year = this.date.getFullYear();
        const month = this.addLeftPadding(this.date.getMonth() + 1);
        const day = this.addLeftPadding(this.date.getDate());

        return [year, month, day];
    }

    addLeftPadding(value) {
        return value >= 10 ? value : `0${value}`;
    }

    toString(delimiter = "") {
        return this.getDateArray().join(delimiter);
    }

    toLocalizedString() {
        const dateArray = this.getDateArray();
        return `${dateArray[0]}년 ${dateArray[1]}월 ${dateArray[2]}일`;
    }

    compareTo(otherDate) {
        return this.date.getTime() - otherDate.date.getTime();
    }

    isEqualTo(otherDate) {
        return this.date.getTime() === otherDate.date.getTime();
    }

    isBefore(otherDate) {
        return this.date < otherDate.date;
    }

    isAfter(otherDate) {
        return this.date > otherDate.date;
    }
}
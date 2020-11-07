new Vue({
    el: "#app",
    data: {
        content: {
            first: true,
            value: "",
        },
        onFocus: false,
        search: {
            index: 0,
            isShow: false,
            first: true,
            api: [
                {
                    name: "谷歌",
                    url: "https://www.google.com/search?q=",
                },
                {
                    name: "必应",
                    url: "https://www.bing.com/search?q=",
                },
                {
                    name: "百度",
                    url: "https://www.baidu.com/s?wd=",
                },
            ],
        },
        reg: [
            "^(http(s)?://){1}[\\s\\S]*$",
            "^((\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5]).){3}(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])(:\\d{1,5})?$",
        ],
    },
    computed: {
        boxStyle() {
            let styleObj = {};
            if (this.content.value != "") {
                this.content.first = false;
                styleObj["animation"] = "showColor 0.3s linear forwards";
            } else if (!this.content.first) {
                styleObj["animation"] = "-showColor 0.3s linear forwards";
            }
            if (this.onFocus) {
                styleObj["box-shadow"] = "0px 0px 5px #BDBDBD";
            }
            return styleObj;
        },
        selectStyle() {
            let styleObj = {};
            if (this.search.isShow) {
                styleObj["animation"] = "showBtn 0.3s linear forwards";
            } else if (!this.search.first) {
                styleObj["animation"] = "-showBtn 0.3s linear forwards";
            } else {
                styleObj["display"] = "none";
            }
            return styleObj;
        },
        itemBtnStyle() {
            let styleObj = {};
            if (!this.search.first) {
                if (this.search.isShow) {
                    styleObj["animation"] = "-showBtn 0.3s linear forwards";
                } else {
                    styleObj["animation"] = "showBtn 0.3s linear forwards";
                }
            }
            return styleObj;
        },
    },
    created() {
        let localindex = localStorage.getItem("index");
        if (localindex != null) {
            this.search.index = localindex;
        }
    },
    methods: {
        getFocus() {
            this.onFocus = true;
        },
        loseFocus() {
            this.onFocus = false;
        },
        goSearch() {
            let reg0 = new RegExp(this.reg[0]);
            let reg1 = new RegExp(this.reg[1]);
            if (this.content.value != "") {
                if (reg0.test(this.content.value)) {
                    window.location.href = this.content.value;
                }
                if (reg1.test(this.content.value)) {
                    window.location.href = "http://" + this.content.value;
                } else {
                    window.location.href =
                        this.search.api[this.search.index].url +
                        this.content.value;
                }
                this.content.value = "";
            }
        },
        keyDown(event) {
            if (event.keyCode == 13) {
                this.goSearch();
            }
        },
        showSearch() {
            this.search.first = false;
            this.search.isShow = !this.search.isShow;
            setTimeout(() => {
                this.search.isShow = false;
            }, 3000);
        },
        setIndex(res) {
            this.search.index = res;
            localStorage.setItem("index", res);
        },
    },
});

new Vue({
    el: "#app",
    data: {
        content: "",
        onFocus: false,
        search: {
            index: 0,
            isShow: false,
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
        appStyle() {
            styleObj = {};
            if (this.content != "") {
                styleObj["animation"] = "showColor 0.2s linear forwards";
            }
            if (this.onFocus) {
                styleObj["box-shadow"] = "0px 0px 5px #BDBDBD";
            }
            return styleObj;
        },
        searchStyle() {
            return this.search.isShow ? "" : { display: "none" };
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
            if (this.content != "") {
                if (reg0.test(this.content)) {
                    window.location.href = this.content;
                }
                if (reg1.test(this.content)) {
                    window.location.href = "http://" + this.content;
                } else {
                    window.location.href =
                        this.search.api[this.search.index].url + this.content;
                }
                this.content = "";
            }
        },
        keyDown() {
            if (event.keyCode == 13) {
                this.goSearch();
            }
        },
        showSearch() {
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

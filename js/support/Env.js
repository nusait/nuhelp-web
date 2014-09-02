var Env = {
    LOCAL : 0,
    DEV : 1,
    PROD : 2,
    getEnvironment: function () {
        if (document.querySelector('html').classList.contains('env-local')) {
            return this.LOCAL;
        } else if (document.querySelector('html').classList.contains('env-dev')) {
            return this.DEV;
        } else {
            return this.PROD;
        }
    },
    setEnvironment: function (env) {
        if (env === this.LOCAL) {
            document.querySelector('html').classList.remove('env-test');
            document.querySelector('html').classList.remove('env-prod');
            document.querySelector('html').classList.add('env-local');
        } else if (env === this.DEV) {
            document.querySelector('html').classList.remove('env-local');
            document.querySelector('html').classList.remove('env-prod');
            document.querySelector('html').classList.add('env-test');
        } else if (env === this.PROD) {
            document.querySelector('html').classList.remove('env-test');
            document.querySelector('html').classList.remove('env-local');
            document.querySelector('html').classList.add('env-prod');
        }
    }
};

module.exports = Env;
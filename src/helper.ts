import rp from "request-promise";

const helper = {
    async makeRequest(options: rp.Options) {
        return rp({
            ...options
        });
    }
}

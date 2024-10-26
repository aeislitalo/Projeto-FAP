"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class GetData {
    baseUrl;
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async sendRequest(endpoint, method, requestBody) {
        let config = {
            url: `${this.baseUrl}${endpoint}`,
            method,
            data: requestBody,
        };
        try {
            let response = await axios_1.default.request(config);
            return response.data;
        }
        catch (error) {
            console.error("Error making request:", error);
            throw error; // Re-lança o erro para ser tratado pelo chamador
        }
    }
}
exports.default = GetData;
//# sourceMappingURL=GetData.js.map
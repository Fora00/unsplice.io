"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_model_1 = __importDefault(require("../../models/module.model"));
exports.default = {
    Query: {
        getContent: (_, { moduleId, contentId }) => __awaiter(void 0, void 0, void 0, function* () {
            const module = yield module_model_1.default.findById(moduleId);
            const content = module.contents.find((content) => content.id === contentId);
            return content;
        }),
    },
    Mutation: {
        createContent: (_, { contentInput: { moduleId, number, title, desc, notionContent } }) => __awaiter(void 0, void 0, void 0, function* () {
            // TODO: Validate user Input
            console.log(moduleId);
            // create module
            const newContent = {
                number,
                title,
                desc,
                completed: false,
                notionContent,
                createdAt: new Date().toISOString(),
            };
            // Update module's content array
            const updatedModule = yield module_model_1.default.update({ _id: moduleId }, { $push: { contents: newContent } });
            console.log(newContent);
            return newContent;
        }),
    },
};

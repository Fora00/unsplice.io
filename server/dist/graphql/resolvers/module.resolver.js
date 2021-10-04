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
const Module = require('../../models/module.model');
const Program = require('../../models/program.model');
module.exports = {
    Query: {
        getModuleList: (_, { programId }) => __awaiter(void 0, void 0, void 0, function* () {
            const program = yield Program.findById(programId); // ["cs1", "cs2", "cs3"]
            // Find module where code is ["cs1", "cs2", "cs3"]
            const modules = yield Module.find({
                moduleCode: {
                    $in: program.moduleCodes
                }
            });
            return modules;
        }),
        getModule: (_, { moduleId }) => __awaiter(void 0, void 0, void 0, function* () {
            const module = yield Module.findById(moduleId);
            return module;
        })
    },
    Mutation: {
        createModule: (_, { moduleInput: { programId, name, moduleCode, desc } }) => __awaiter(void 0, void 0, void 0, function* () {
            // TODO: Validate user Input
            // Update program's module code array
            const updatedProgram = yield Program.update({ _id: programId }, { $push: { moduleCodes: moduleCode } });
            // create module
            const newModule = yield Module.create({
                name,
                moduleCode,
                desc,
                progress: 0,
                contents: [],
                createdAt: new Date().toISOString()
            });
            return newModule;
        })
    }
};

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
const user_model_1 = __importDefault(require("../../models/user.model"));
const program_model_1 = __importDefault(require("../../models/program.model"));
// Gql
const apollo_server_1 = require("apollo-server");
// Auth & Session
const config_js_1 = require("../../config.js");
const validators_1 = require("../../utils/validators");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// TODO: Implement Bcrypt
// Jwt Helper function
function generateToken(user, userPrograms) {
    return jsonwebtoken_1.default.sign({
        userInfo: user,
        userPrograms: userPrograms,
    }, config_js_1.SECRET_KEY, { expiresIn: '1h' });
}
exports.default = {
    Query: {
        getClassmates: (_, { programCode }) => __awaiter(void 0, void 0, void 0, function* () {
            // fetch classmates
            const classmates = yield user_model_1.default.find({ programCodes: programCode });
            return classmates;
        }),
    },
    Mutation: {
        login: (_, { email, password }, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            // Validate user data
            const { errors, valid } = (0, validators_1.validateLoginInput)(email, password);
            if (!valid) {
                // throw new Error({ errors })
                throw new apollo_server_1.UserInputError('Input Error', { errors: errors });
            }
            // Handle user data
            const user = yield user_model_1.default.findOne({ email });
            // Handle userprogramCodes
            if (!user) {
                // throw new Error("User not found")
                errors.general = 'User not found';
                throw new apollo_server_1.UserInputError('User not found', { errors: errors });
            }
            // Handle password
            if (password != user.password) {
                // throw new Error("Wrong credentials")
                errors.general = 'Wrong credentials';
                throw new apollo_server_1.UserInputError('Wrong credentials', { errors: errors });
            }
            // Handle program data
            const userPrograms = yield program_model_1.default.find({
                programCode: {
                    $in: user.programCodes,
                },
            });
            // jwt
            const token = generateToken(user, userPrograms);
            // Return User Info
            return {
                userInfo: user,
                userPrograms: userPrograms,
                token: token,
            };
        }),
        createUser: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password, confirmPassword, firstprogramCodes, lastprogramCodes, institution, role, programCode, picture, } = args.registerInput;
            const { github, linkedin, instagram, website } = args.registerInput.socialLinks;
            // Validate user data
            const { errors, valid } = (0, validators_1.validateRegisterInput)(email, password, confirmPassword);
            if (!valid) {
                throw new apollo_server_1.UserInputError('Input Error', { errors: errors });
            }
            // Make sure email doesn't already exist
            const user = yield user_model_1.default.findOne({ email });
            if (user) {
                throw new apollo_server_1.UserInputError('Email is taken', {
                    errors: {
                        userprogramCodes: 'This email is taken',
                    },
                });
            }
            // Create user
            const newUser = new user_model_1.default({
                email,
                password,
                firstprogramCodes,
                lastprogramCodes,
                institution,
                role,
                picture,
                socialLinks: {
                    instagram,
                    github,
                    linkedin,
                    website,
                },
                programCodes: [programCode],
                createdAt: new Date().toISOString(),
            });
            const res = yield newUser.save();
            // Return User Info
            return res;
        }),
        swapProgram: (_, { userId, swapIndex }) => __awaiter(void 0, void 0, void 0, function* () {
            let swappedIndex = 'programCodes.' + swapIndex.toString();
            console.log(swappedIndex);
            const user = yield user_model_1.default.findById(userId);
            const programCodes = user === null || user === void 0 ? void 0 : user.programCodes;
            console.log(programCodes);
            // [programCodes[0], programCodes[swapIndex]] = [programCodes[swapIndex], programCodes[0]]
            let b = programCodes[0];
            programCodes[0] = programCodes[swapIndex];
            programCodes[swapIndex] = b;
            console.log(programCodes);
            const userSwapProgram = yield user_model_1.default.findOneAndUpdate({ _id: userId }, {
                programCodes,
            });
            return userSwapProgram;
        }),
    },
};

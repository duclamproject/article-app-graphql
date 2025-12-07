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
exports.resolversUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const generate_helper_1 = require("../helpers/generate.helper");
exports.resolversUser = {
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(context["user"]);
            const { id } = args;
            const inforUser = yield user_model_1.default.findOne({
                deleted: false,
                token: context["user"].token,
            });
            if (!inforUser) {
                return {
                    code: 400,
                    message: "Người dùng không tồn tại",
                };
            }
            return {
                id: inforUser._id,
                email: inforUser.email,
                fullName: inforUser.fullName,
                token: inforUser.token,
                code: 200,
                message: "Lấy thông tin người dùng thành công",
            };
        }),
    },
    Mutation: {
        createUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const userExits = yield user_model_1.default.findOne({
                email: user.email,
            });
            if (userExits) {
                return {
                    code: 400,
                    message: "Người dùng đã tồn tại",
                };
            }
            else {
                user.password = (0, md5_1.default)(user.password);
                const newUser = new user_model_1.default(user);
                newUser.token = (0, generate_helper_1.generateRandomString)(30);
                yield newUser.save();
                return {
                    code: 200,
                    message: "Tạo người dùng thành công",
                    id: newUser._id,
                    email: newUser.email,
                    fullName: newUser.fullName,
                    token: newUser.token,
                };
            }
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const userFound = yield user_model_1.default.findOne({
                email: user.email,
                password: (0, md5_1.default)(user.password),
            });
            if (!userFound) {
                return {
                    code: 401,
                    message: "Sai email hoặc mật khẩu",
                };
            }
            return {
                code: 200,
                message: "Đăng nhập thành công",
                id: userFound._id,
                email: userFound.email,
                fullName: userFound.fullName,
                token: userFound.token,
            };
        }),
    },
};

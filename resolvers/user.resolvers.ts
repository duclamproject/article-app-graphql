import User from "../models/user.model";
import md5 from "md5";
import { generateRandomString } from "../helpers/generate.helper";

export const resolversUser = {
  Query: {
    getUser: async (_, args, context) => {
      console.log(context["user"]);

      const { id } = args;
      const inforUser = await User.findOne({
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
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const { user } = args;
      const userExits = await User.findOne({
        email: user.email,
      });
      if (userExits) {
        return {
          code: 400,
          message: "Người dùng đã tồn tại",
        };
      } else {
        user.password = md5(user.password);
        const newUser = new User(user);
        newUser.token = generateRandomString(30);
        await newUser.save();
        return {
          code: 200,
          message: "Tạo người dùng thành công",
          id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          token: newUser.token,
        };
      }
    },
    loginUser: async (_, args) => {
      const { user } = args;
      const userFound = await User.findOne({
        email: user.email,
        password: md5(user.password),
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
    },
  },
};

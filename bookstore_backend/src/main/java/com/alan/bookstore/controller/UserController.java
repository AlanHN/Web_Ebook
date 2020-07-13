package com.alan.bookstore.controller;

import com.alan.bookstore.constant.Constant;
import com.alan.bookstore.entity.*;
import com.alan.bookstore.service.UserService;
import com.alan.bookstore.utils.msgutils.Msg;
import com.alan.bookstore.utils.msgutils.MsgCode;
import com.alan.bookstore.utils.msgutils.MsgUtil;
import com.alan.bookstore.utils.sessionutils.SessionUtil;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/getUsers")
    public List<User> getUsers() {
        System.out.println("getUsers");
        return userService.findAllUsers();
    }

    @RequestMapping("/login")
    public Msg login(@RequestBody Map<String, String> params) {
        System.out.println("login");
        String username = params.get(Constant.USERNAME);
        String password = params.get(Constant.PASSWORD);
        User auth = userService.checkUser(username, password);
        if (auth != null) {
            JSONObject obj = new JSONObject();
            obj.put(Constant.USER_ID, auth.getUserId());
            obj.put(Constant.USERNAME, auth.getUsername());
            obj.put(Constant.USER_TYPE, auth.getUserType());
            SessionUtil.setSession(obj);

            JSONObject data = JSONObject.fromObject(auth);
            data.remove(Constant.PASSWORD);
            data.remove(Constant.USERICON);

            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, data);
        } else {
            return MsgUtil.makeMsg(MsgCode.LOGIN_USER_ERROR);
        }
    }

    @RequestMapping("/register")
    public Msg register(@RequestBody Map<String, String> params) {
        System.out.println("register");

        String username = params.get(Constant.USERNAME);

        List<User> tests = userService.findAllUsers();

        for (User test: tests)
        {
            if (test.getUsername().equals(username)){
                return MsgUtil.makeMsg(MsgCode.REGISTER_USER_ERROR);
            }
        }

        String password = params.get(Constant.PASSWORD);
        String email = params.get(Constant.EMAIL);
        String address = params.get(Constant.ADDRESS);
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setUserType(Constant.CUSTOMER);
        user.setEmail(email);
        user.setAddress(address);

        userService.addUser(user);

        JSONObject obj = new JSONObject();
        obj.put(Constant.USER_ID, user.getUserId());
        obj.put(Constant.USERNAME, user.getUsername());
        obj.put(Constant.USER_TYPE, user.getUserType());
        SessionUtil.setSession(obj);

        JSONObject data = JSONObject.fromObject(user);
        data.remove(Constant.PASSWORD);

        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.REGISTER_SUCCESS_MSG, data);
    }


    @RequestMapping("/logout")
    public Msg logout() {
        System.out.println("logout");
        Boolean status = SessionUtil.removeSession();

        if (status) {
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGOUT_SUCCESS_MSG);
        }
        return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.LOGOUT_ERR_MSG);
    }

    @RequestMapping("/checkSession")
    public Msg checkSession() {
        System.out.println("checkSession");
        JSONObject auth = SessionUtil.getAuth();

        if (auth == null) {
            return MsgUtil.makeMsg(MsgCode.NOT_LOGGED_IN_ERROR);
        } else {
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, auth);
        }
    }

    @RequestMapping("/getUserById")
    public User getUserById(@RequestBody Map<String, String> params) {
        System.out.println("getUserById");
        Integer userId = Integer.valueOf(params.get(Constant.USER_ID));
            return userService.getUserById(userId);
    }

    @RequestMapping("/editUser")
    public Msg editUser(@RequestBody Map<String, String> params) {
        System.out.println("editUser");
        Integer userId = Integer.valueOf(params.get(Constant.USER_ID));
        User user = userService.getUserById(userId);
        System.out.println(user);
        Integer userType = Integer.valueOf(params.get(Constant.USER_TYPE));
        user.setUserType(userType);
        System.out.println(userType);
        userService.addUser(user);
        return MsgUtil.makeMsg(MsgCode.SUCCESS);
    }

    @RequestMapping("/deleteUser")
    public Msg deleteBook(@RequestParam("id") Integer id) {
        System.out.println("deleteBook: " + id);
        userService.deleteUserById(id);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.DELETE_SUCCESS_MSG);
    }
}

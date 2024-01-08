import axios from "axios";
import { z } from "zod";

export const loginApiSchema = z.object({
    token: z.string(),
    roleList: z.array(z.object({
        
    })),
});

export const login = (loginEmail: string, password: string) => {
    console.log(loginEmail);
    console.log(password);
    try {
        axios
            .post("http://localhost:8080/employee/login", {
                loginEmail,
                password,
            })
            .then(function (response) {
                const { token, roleList } = loginApiSchema.parse(response.data);
                localStorage.setItem("token", token);
                localStorage.setItem("role", JSON.stringify(roleList));
            });
    } catch (error) {
        console.log("error");
        return false;
    }
    return true;
};

//props -> check

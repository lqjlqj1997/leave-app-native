import axios from "axios";

const handleSubmit = (loginEmail: string, password: string) => {
        console.log(loginEmail);
        console.log(password)
        try {
            axios.post("http://localhost:8080/employee/login", {
                loginEmail,
                password,
            }).then(function (response) {
                const { token, roleList } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("role", JSON.stringify(roleList));
            }
            );
        } catch (error) {   
            console.log("error");
            return false
        }
        return true
    }

    //props -> check
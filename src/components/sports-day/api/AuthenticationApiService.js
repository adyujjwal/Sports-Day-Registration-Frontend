import { apiClient } from "./ApiClient";

export const executeAuthenticationService
    = (username) => 
        apiClient.post(`api/login?username=${username}`)

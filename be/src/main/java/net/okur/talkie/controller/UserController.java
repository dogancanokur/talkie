package net.okur.talkie.controller;

import net.okur.talkie.error.ApiError;
import net.okur.talkie.model.input.UserInput;
import net.okur.talkie.model.output.UserOutput;
import net.okur.talkie.service.UserService;
import net.okur.talkie.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @author dogancan.okur
 * 3.06.2023 02:59
 */
@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/1.0/users")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody ResponseEntity<?> createUser(@RequestBody UserInput userInput) {
        Map<String, String> validationErrors = new HashMap<>();

        if (!StringUtils.hasText(userInput.getUsername())) {
            validationErrors.put("username", "Username cannot be null");
        }
        if (!StringUtils.hasText(userInput.getDisplayName())) {
            validationErrors.put("displayName", "Display name cannot be null");
        }
        if (!StringUtils.hasText(userInput.getPassword())) {
            validationErrors.put("password", "Password cannot be null");
        }
        if (!validationErrors.isEmpty()) {
            ApiError error = new ApiError(400, "Validation error", "/api/1.0/users");
            error.setValidationErrors(validationErrors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
        UserOutput userOutput = userService.createUser(userInput);
        return (userOutput == null ? ResponseEntity.status(HttpStatus.CONFLICT).build() : ResponseEntity.ok().body(new GenericResponse("User created, " + userOutput.getUsername())));
    }
}

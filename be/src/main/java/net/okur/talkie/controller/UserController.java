package net.okur.talkie.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import net.okur.talkie.error.ApiError;
import net.okur.talkie.model.input.UserInput;
import net.okur.talkie.model.output.UserOutput;
import net.okur.talkie.service.UserService;
import net.okur.talkie.shared.GenericResponse;

/**
 * @author dogancan.okur 3.06.2023 02:59
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
    public @ResponseBody GenericResponse createUser(@Valid @RequestBody UserInput userInput) {
	UserOutput userOutput = userService.createUser(userInput);
	if (userOutput == null) {
	    return new GenericResponse("User could not be created");
	}
	return new GenericResponse("User created -> " + userOutput.getUsername());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleValidationException(MethodArgumentNotValidException exception) {
	ApiError error = new ApiError(400, "Validation error", "/api/1.0/users");
	Map<String, String> validationErrors = new HashMap<>();
	exception.getBindingResult().getFieldErrors()
		.forEach(fieldError -> validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage()));
	error.setValidationErrors(validationErrors);
	return error;
    }

}

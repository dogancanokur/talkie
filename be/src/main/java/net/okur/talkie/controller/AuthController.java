package net.okur.talkie.controller;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import net.okur.talkie.entity.User;
import net.okur.talkie.error.ApiError;
import net.okur.talkie.model.output.UserOutput;
import net.okur.talkie.repository.UserRepository;

/**
 * @author dogancan.okur 10.06.2023
 */
@RestController
@Slf4j
public class AuthController {
  public static final int UNAUTHORIZED_CODE = 401;
  private final UserRepository userRepository;

  @Autowired
  public AuthController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  private static ResponseEntity<ApiError> getUnauthorizedMessage() {
    ApiError apiError = new ApiError(UNAUTHORIZED_CODE, "Unauthorized request", "/api/1.0/auth");
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
  }

  @PostMapping("/api/1.0/auth")
  public ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization") String authorization) {
    String base64encoded = authorization.split("Basic ")[1];
    String decoded = new String(Base64.getDecoder().decode(base64encoded));
    String username = decoded.split(":")[0];
    User userInDb = userRepository.getUserByUsername(username);
    UserOutput userOutput = new UserOutput();
    userOutput.setUsername(userInDb.getUsername());
    userOutput.setDisplayName(userInDb.getDisplayName());
    userOutput.setImage(userInDb.getImage());
    return ResponseEntity.ok().body(userOutput);
  }
}

package net.okur.talkie.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import net.okur.talkie.entity.User;
import net.okur.talkie.model.output.UserOutput;

/**
 * @author dogancan.okur 10.06.2023
 */
@RestController
@Slf4j
public class AuthController {

  @PostMapping("/api/1.0/auth")
  public ResponseEntity<UserOutput> handleAuthentication(Authentication authentication) {
    User userPrincipal = (User)authentication.getPrincipal();

    UserOutput userOutput = new UserOutput();
    userOutput.setUsername(userPrincipal.getUsername());
    userOutput.setDisplayName(userPrincipal.getDisplayName());
    userOutput.setImage(userPrincipal.getImage());
    return ResponseEntity.ok().body(userOutput);
  }
}

package net.okur.talkie.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import net.okur.talkie.entity.User;
import net.okur.talkie.model.output.UserOutput;
import net.okur.talkie.shared.CurrentUser;

/**
 * @author dogancan.okur 10.06.2023
 */
@RestController
@Slf4j
public class AuthController {

  @PostMapping("/api/1.0/auth")
  public ResponseEntity<UserOutput> handleAuthentication(@CurrentUser User user) {
    UserOutput userOutput = new UserOutput();
    userOutput.setUsername(user.getUsername());
    userOutput.setDisplayName(user.getDisplayName());
    userOutput.setImage(user.getImage());
    return ResponseEntity.ok().body(userOutput);
  }
}

package net.okur.talkie.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author dogancan.okur 10.06.2023 05:01
 */
@RestController
public class DummyController {
  @GetMapping("/secured")
  public String secured() {
    return "secured";
  }

  @GetMapping("/not-secured")
  public String notSecured() {
    return "notSecured";
  }
}

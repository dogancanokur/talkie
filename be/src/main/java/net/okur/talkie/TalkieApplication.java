package net.okur.talkie;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import net.okur.talkie.model.input.UserInput;
import net.okur.talkie.service.UserService;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class }) // TODO: security is disabled for now
public class TalkieApplication {

  public static void main(String[] args) {
    SpringApplication.run(TalkieApplication.class, args);
  }

  @Bean
  CommandLineRunner createInitialUsers(UserService userService) {
    return args -> {
      UserInput userInput = new UserInput();
      userInput.setUsername("user1");
      userInput.setDisplayName("display1");
      userInput.setPassword("P4ssword");
      userService.createUser(userInput);
    };
  }
}

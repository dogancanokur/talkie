package net.okur.talkie;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import net.okur.talkie.model.input.UserInput;
import net.okur.talkie.service.UserService;

@SpringBootApplication
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

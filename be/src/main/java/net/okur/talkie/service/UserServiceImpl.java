package net.okur.talkie.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import net.okur.talkie.entity.User;
import net.okur.talkie.model.input.UserInput;
import net.okur.talkie.model.output.UserOutput;
import net.okur.talkie.repository.UserRepository;

/**
 * @author dogancan.okur 3.06.2023 03:00
 */
@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserOutput createUser(UserInput userInput) {
    User savedUser = userRepository.getUserByUsername(userInput.getUsername());
    if (savedUser == null) {

      User user = new User();
      user.setUsername(userInput.getUsername());
      user.setDisplayName(userInput.getDisplayName());
      String encryptedPassword = passwordEncoder.encode(userInput.getPassword());
      user.setPassword(encryptedPassword);
      user = userRepository.save(user);

      UserOutput userOutput = new UserOutput();
      userOutput.setUsername(user.getUsername());
      userOutput.setDisplayName(user.getDisplayName());
      return userOutput;

    }
    return null;
  }
}

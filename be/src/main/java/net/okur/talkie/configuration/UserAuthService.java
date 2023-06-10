package net.okur.talkie.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import net.okur.talkie.entity.User;
import net.okur.talkie.repository.UserRepository;

/**
 * @author dogancan.okur 10.06.2023 04:30
 */
@Service
public class UserAuthService implements UserDetailsService {
  private final UserRepository userRepository;

  @Autowired
  public UserAuthService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User userInDb = userRepository.getUserByUsername(username);
    if (userInDb == null) {
      throw new UsernameNotFoundException("User not found");
    }
    return new TalkieUserDetails(userInDb);
  }
}

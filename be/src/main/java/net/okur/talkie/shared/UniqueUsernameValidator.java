package net.okur.talkie.shared;

import org.springframework.beans.factory.annotation.Autowired;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import net.okur.talkie.repository.UserRepository;

/**
 * @author dogancan.okur 4.06.2023 14:48
 */
public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {
  @Autowired
  private UserRepository userRepository;

  @Override
  public void initialize(UniqueUsername constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    return userRepository.findByUsername(value).isEmpty();
  }
}

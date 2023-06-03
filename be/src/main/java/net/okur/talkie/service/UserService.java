package net.okur.talkie.service;

import net.okur.talkie.model.input.UserInput;
import net.okur.talkie.model.output.UserOutput;

/**
 * @author dogancan.okur
 * 3.06.2023 02:59
 */
public interface UserService {

    UserOutput createUser(UserInput userInput);
}

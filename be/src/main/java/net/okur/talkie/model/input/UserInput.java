package net.okur.talkie.model.input;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import net.okur.talkie.shared.UniqueUsername;

/**
 * @author dogancan.okur 3.06.2023 23:43
 */
@Data
public class UserInput {
    // @NotNull
    String email;
    @NotNull(message = "{talkie.validation.constraints.NotNull.username.message}")
    @Size(min = 4, max = 32, message = "{talkie.validation.constraints.Size.message}")
    @Pattern(regexp = "^(?=.*[0-9a-zA-Z]).{4,20}$", message = "{talkie.validation.constraints.Pattern.username.message}")
    @UniqueUsername
    String username;
    @NotNull(message = "{talkie.validation.constraints.NotNull.displayName.message}")
    @Size(min = 4, max = 64, message = "{talkie.validation.constraints.Size.message}")
    String displayName;
    @NotNull(message = "{talkie.validation.constraints.NotNull.password.message}")
    @Size(min = 4, max = 20, message = "{talkie.validation.constraints.Size.message}")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{4,20}$", message = "{talkie.validation.constraints.Pattern.password.message}")
    String password;
}

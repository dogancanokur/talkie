package net.okur.talkie.model.input;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * @author dogancan.okur
 * 3.06.2023 23:43
 */
@Data
public class UserInput {
    //    @NotNull
    String email;
    @NotNull
    @Size(min = 4, max = 32, message = "Username must be between 4 and 32 characters")
    @Pattern(regexp = "^(?=.*[0-9a-zA-Z]).{4,20}$", message = "Username must contain only letters and numbers")
    String username;
    @NotNull
    @Size(min = 4, max = 64, message = "Display name must be between 4 and 64 characters")
    String displayName;
    @NotNull
    @Size(min = 4, max = 20, message = "Password must be between 4 and 20 characters")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{4,20}$", message = "Password must contain at least one uppercase, one lowercase and one number")
    String password;
}

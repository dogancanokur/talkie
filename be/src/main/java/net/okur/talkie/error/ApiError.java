package net.okur.talkie.error;

import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.Data;
import net.okur.talkie.shared.Views;

/**
 * @author dogancan.okur 4.06.2023 02:56
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL) // if property is null it will not be serialized
public class ApiError {
    @JsonView(Views.Base.class)
    private int status;
    @JsonView(Views.Base.class)
    private String message;
    @JsonView(Views.Base.class)
    private String path;
    @JsonView(Views.Base.class)
    private long timestamp = new Date().getTime();
    @JsonView(Views.Base.class)
    private Map<String, String> validationErrors;

    public ApiError(int status, String message, String path) {
	this.status = status;
	this.message = message;
	this.path = path;
    }
}

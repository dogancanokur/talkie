package net.okur.talkie.error;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import lombok.extern.slf4j.Slf4j;

/**
 * @author dogancan.okur 10.06.2023 14:37
 */
@RestController
@Slf4j
public class ErrorHandler implements ErrorController {
  private final ErrorAttributes errorAttributes;

  @Autowired
  public ErrorHandler(ErrorAttributes errorAttributes) {
    this.errorAttributes = errorAttributes;
  }

  @RequestMapping("/error")
  ApiError handleError(WebRequest webRequest) {
    ErrorAttributeOptions errorAttributeOptions =
        ErrorAttributeOptions.of(ErrorAttributeOptions.Include.MESSAGE, ErrorAttributeOptions.Include.BINDING_ERRORS);

    Map<String, Object> attributes = this.errorAttributes.getErrorAttributes(webRequest, errorAttributeOptions);
    int status = (Integer)attributes.get("status");
    String message =
        status == HttpStatus.INTERNAL_SERVER_ERROR.value() ? HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase()
            : (String)attributes.get("message");
    String path = (String)attributes.get("path");
    log.error("%s for %s".formatted(path, attributes.get("message")));
    ApiError apiError = new ApiError(status, message, path);
    if (attributes.containsKey("errors")) {
      @SuppressWarnings("unchecked")
      List<FieldError> fieldErrors = (List<FieldError>)attributes.get("errors");
      Map<String, String> validationErrors = new HashMap<>();
      fieldErrors.forEach(fieldError -> validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage()));
      apiError.setValidationErrors(validationErrors);
    }

    return apiError;
  }
}

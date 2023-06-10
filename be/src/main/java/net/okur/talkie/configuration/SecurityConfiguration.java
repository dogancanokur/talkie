package net.okur.talkie.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;

/**
 * @author dogancan.okur 10.06.2023 03:53
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
  private final UserAuthService userAuthService;

  @Autowired
  public SecurityConfiguration(UserAuthService userAuthService) {
    this.userAuthService = userAuthService;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable);
    http.httpBasic(
        httpSecurityHttpBasicConfigurer -> httpSecurityHttpBasicConfigurer.authenticationEntryPoint((request, response,
            authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage())));

    http//
        .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry
            .requestMatchers(HttpMethod.POST, "/api/1.0/auth", "/api/1.0/users", "/error").permitAll())
        .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry
            .anyRequest().authenticated());

    http.userDetailsService(userAuthService);

    http.sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}

package net.okur.talkie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class}) // TODO: security is disabled for now
public class TalkieApplication {

    public static void main(String[] args) {
        SpringApplication.run(TalkieApplication.class, args);
    }

}

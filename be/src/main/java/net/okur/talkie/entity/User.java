package net.okur.talkie.entity;

import com.fasterxml.jackson.annotation.JsonView;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import net.okur.talkie.shared.Views;

/**
 * @author dogancan.okur 3.06.2023 03:08
 */
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;
    @Column(name = "username", unique = true, nullable = false, length = 32)
    @JsonView(Views.Base.class)
    private String username;
    @Column(name = "display_name", nullable = false, length = 64)
    @JsonView(Views.Base.class)
    private String displayName;
    @Column(name = "password", nullable = false)
    @JsonView(Views.Sensitive.class)
    private String password;
    @Column(name = "image")
    @JsonView(Views.Base.class)
    private String image;
}

package net.okur.talkie.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author dogancan.okur
 * 3.06.2023 03:08
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
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "username", unique = true, nullable = false, length = 32)
    private String username;
    @Column(name = "display_name", nullable = false, length = 64)
    private String displayName;
    @Column(name = "password", nullable = false)
    private String password;
}

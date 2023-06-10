package net.okur.talkie.entity;

import java.io.Serial;
import java.io.Serializable;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author dogancan.okur 3.06.2023 03:08
 */
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "users")
public class User implements Serializable {
  @Serial
  private static final long serialVersionUID = 8615325071140143848L;
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id")
  private Long id;
  @Column(name = "username", unique = true, nullable = false, length = 32)
  private String username;
  @Column(name = "display_name", nullable = false, length = 64)
  private String displayName;
  @Column(name = "password", nullable = false)
  private String password;
  @Column(name = "image")
  private String image;
}

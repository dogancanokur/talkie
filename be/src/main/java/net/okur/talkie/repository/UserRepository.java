package net.okur.talkie.repository;

import net.okur.talkie.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author dogancan.okur
 * 3.06.2023 03:03
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User getUserByUsername(String username);
}

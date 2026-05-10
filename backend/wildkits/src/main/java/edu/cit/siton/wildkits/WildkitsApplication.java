package edu.cit.siton.wildkits;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "edu.cit.siton.wildkits")
@EnableJpaRepositories(basePackages = "edu.cit.siton.wildkits")
public class WildkitsApplication {

    public static void main(String[] args) {
        SpringApplication.run(WildkitsApplication.class, args);
    }
}
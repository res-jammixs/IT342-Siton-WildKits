package edu.cit.siton.wildkits;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.wildkits", "edu.cit.siton.wildkits"})
@EntityScan(basePackages = "com.wildkits.entity")
@EnableJpaRepositories(basePackages = "com.wildkits.repository")
public class WildkitsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WildkitsApplication.class, args);
	}

}

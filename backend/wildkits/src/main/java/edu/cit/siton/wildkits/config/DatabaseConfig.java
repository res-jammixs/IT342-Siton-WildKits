package edu.cit.siton.wildkits.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@Slf4j
public class DatabaseConfig {

    @Value("${spring.datasource.url:}")
    private String url;

    @Value("${spring.datasource.username:}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Value("${spring.datasource.hikari.maximum-pool-size:10}")
    private int maximumPoolSize;

    @Value("${spring.datasource.hikari.minimum-idle:2}")
    private int minimumIdle;

    @Value("${spring.datasource.hikari.connection-timeout:30000}")
    private long connectionTimeout;

    @Bean
    public DataSource dataSource() {
        log.info("Configuring HikariCP DataSource for Supabase PostgreSQL");

        String resolvedUrl = requireValue("SUPABASE_DB_URL / spring.datasource.url", url);
        String resolvedUsername = requireValue("SUPABASE_DB_USER / spring.datasource.username", username);
        String resolvedPassword = requireValue("SUPABASE_DB_PASSWORD / spring.datasource.password", password);
        
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(resolvedUrl);
        config.setUsername(resolvedUsername);
        config.setPassword(resolvedPassword);
        config.setDriverClassName("org.postgresql.Driver");
        
        // HikariCP settings
        config.setMaximumPoolSize(maximumPoolSize);
        config.setMinimumIdle(minimumIdle);
        config.setConnectionTimeout(connectionTimeout);
        config.setIdleTimeout(600000); // 10 minutes
        config.setMaxLifetime(1800000); // 30 minutes
        config.setConnectionTestQuery("SELECT 1");
        
        // Connection pool name
        config.setPoolName("WildKits-HikariCP");
        
        // Additional settings
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        
        log.info("HikariCP configured successfully with max pool size: {}", maximumPoolSize);
        
        return new HikariDataSource(config);
    }

    private String requireValue(String name, String value) {
        String trimmed = value == null ? "" : value.trim();
        if (trimmed.isEmpty()) {
            throw new IllegalStateException("Missing datasource configuration: " + name
                    + ". Set it in environment variables or .env.");
        }
        return trimmed;
    }
}

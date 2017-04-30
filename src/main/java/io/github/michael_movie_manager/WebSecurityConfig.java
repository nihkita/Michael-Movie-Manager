package io.github.michael_movie_manager;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
     // @formatter:off
        http
            .csrf()
                .disable()
            .exceptionHandling()
            .and()
                .authorizeRequests()
                    .antMatchers("/index.html", "/assets/**", "/login", "/api/googleauth").permitAll()
                    .antMatchers("/api/**").authenticated();
     // @formatter:on
    }
}

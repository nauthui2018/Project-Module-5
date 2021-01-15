package com.shopnow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private DataSource dataSource;
    @Bean
    public BCryptPasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        //check login
        auth.jdbcAuthentication().dataSource(dataSource)
                .usersByUsernameQuery("SELECT email, password, enable FROM users WHERE email = ?")
                .authoritiesByUsernameQuery("SELECT  email, concat('ROLE_',role) as roles FROM users WHERE email = ?")
                .passwordEncoder(encoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // Các trang không yêu cầu login như vậy ai cũng có thể vào được admin hay user hoặc guest có thể vào các trang
        http.authorizeRequests().antMatchers("/", "/login/**", "/logout/**").permitAll()
                .and()
                .authorizeRequests().antMatchers("/user/**").hasAnyRole("EMPLOYEE","SHOP_OWNER")
                .and()
                .authorizeRequests().antMatchers("/admins/**").hasRole("ADMIN")
                .and()
                .authorizeRequests().antMatchers("/api/**").hasAnyRole("EMPLOYEE","SHOP_OWNER","ADMIN")
                .and()
                .formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/default")
                .failureForwardUrl("/fail-login")
                // Cấu hình cho Logout Page. Khi logout mình trả về trang
                .and().logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"));

        http.authorizeRequests().and().exceptionHandling().accessDeniedPage("/403");
        http.csrf().disable();
    }
    @Override
    public void configure(WebSecurity web) throws Exception{
        web.ignoring().antMatchers("/static/**");
    }
}

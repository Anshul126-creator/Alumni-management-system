package com.alumni.gateway.config;

import com.alumni.gateway.filter.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;

@Configuration
public class GatewayConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public GatewayConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-service", r -> r.path("/api/auth/**")
                        .uri("http://localhost:8081"))
                .route("alumni-service", r -> r.path("/api/alumni/**")
                        .filters(f -> f.filter(jwtAuthenticationFilter))
                        .uri("http://localhost:8082"))
                .route("event-service", r -> r.path("/api/events/**")
                        .filters(f -> f.filter(jwtAuthenticationFilter))
                        .uri("http://localhost:8083"))
                .route("communication-service", r -> r.path("/api/messages/**", "/api/mentorship/**")
                        .filters(f -> f.filter(jwtAuthenticationFilter))
                        .uri("http://localhost:8084"))
                .build();
    }
}

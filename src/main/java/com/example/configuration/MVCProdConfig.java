package com.example.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by nikhil on 10/17/16.
 */
@Profile({"prod"})
@Configuration
public class MVCProdConfig extends WebMvcConfigurerAdapter {

    private final int YEAR_CACHE_HEADER = 31556952;

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {

        registry
                .addResourceHandler("/assets/fonts/*")
                .addResourceLocations("/assets/fonts/")
                .setCachePeriod(YEAR_CACHE_HEADER);

        /**
         * Caching of css and js files to be enabled via versioning of these files. Yearly caching applies
         */
        registry
                .addResourceHandler("/assets/*.css")
                .addResourceLocations("/assets/")
                .setCachePeriod(YEAR_CACHE_HEADER);

        registry
                .addResourceHandler("/assets/**/*")
                .addResourceLocations("/assets/")
                .setCachePeriod(YEAR_CACHE_HEADER);

        registry
                .addResourceHandler("/*.css")
                .addResourceLocations("/pdfjs/web/");

        registry
                .addResourceHandler("/images/*")
                .addResourceLocations("/pdfjs/web/images/");

        registry
                .addResourceHandler("/build/*.js")
                .addResourceLocations("/pdfjs/build/");

        registry
                .addResourceHandler("/locale/**/*")
                .addResourceLocations("/pdfjs/web/locale/", "/pdfjs/web/locale/en-US/", "/pdfjs/web/locale/en-GB/");

        registry
                .addResourceHandler("/**/*.js")
                .addResourceLocations("/assets/", "/pdfjs/", "/pdfjs/web/");
    }
}

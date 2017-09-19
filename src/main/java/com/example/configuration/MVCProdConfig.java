package com.example.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by nikhil on 10/17/16.
 */

@Configuration
public class MVCProdConfig extends WebMvcConfigurerAdapter
{

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry)
	{
		registry.addResourceHandler("*.js").addResourceLocations("classpath:/templates/assets/");

		registry.addResourceHandler("*.css").addResourceLocations("classpath:/templates/assets/");
	}

}

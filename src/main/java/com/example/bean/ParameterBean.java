/**
 * @author Anurag
 * @description 
 */
package com.example.bean;

/**
 * @author Anurag
 * @description 
 */
public class ParameterBean {

  private String silhouette;

  private String neckline;

  private String backline;

  private String sleeves;

  private String cloth;

  private String border;

  private String embroidery;

  /**
   * @author Anurag
   * @return the silhouette
   */
  public String getSilhouette() {
    return silhouette;
  }

  /**
   * @author Anurag
   * @param silhouette the silhouette to set
   */
  public void setSilhouette(String silhouette) {
    this.silhouette = silhouette;
  }

  /**
   * @author Anurag
   * @return the neckline
   */
  public String getNeckline() {
    return neckline;
  }

  /**
   * @author Anurag
   * @param neckline the neckline to set
   */
  public void setNeckline(String neckline) {
    this.neckline = neckline;
  }

  /**
   * @author Anurag
   * @return the backline
   */
  public String getBackline() {
    return backline;
  }

  /**
   * @author Anurag
   * @param backline the backline to set
   */
  public void setBackline(String backline) {
    this.backline = backline;
  }

  /**
   * @author Anurag
   * @return the sleeves
   */
  public String getSleeves() {
    return sleeves;
  }

  /**
   * @author Anurag
   * @param sleeves the sleeves to set
   */
  public void setSleeves(String sleeves) {
    this.sleeves = sleeves;
  }

  /**
   * @author Anurag
   * @return the cloth
   */
  public String getCloth() {
    return cloth;
  }

  /**
   * @author Anurag
   * @param cloth the cloth to set
   */
  public void setCloth(String cloth) {
    this.cloth = cloth;
  }

  /**
   * @author Anurag
   * @return the border
   */
  public String getBorder() {
    return border;
  }

  /**
   * @author Anurag
   * @param border the border to set
   */
  public void setBorder(String border) {
    this.border = border;
  }

  /**
   * @author Anurag
   * @return the embroidery
   */
  public String getEmbroidery() {
    return embroidery;
  }

  /**
   * @author Anurag
   * @param embroidery the embroidery to set
   */
  public void setEmbroidery(String embroidery) {
    this.embroidery = embroidery;
  }

  /**
   * @param silhouette
   * @param neckline
   * @param backline
   * @param sleeves
   * @param cloth
   * @param border
   * @param embroidery
   */
  public ParameterBean(String silhouette, String neckline, String backline, String sleeves,
      String cloth, String border, String embroidery) {
    super();
    this.silhouette = silhouette;
    this.neckline = neckline;
    this.backline = backline;
    this.sleeves = sleeves;
    this.cloth = cloth;
    this.border = border;
    this.embroidery = embroidery;
  }

  /**
   * 
   */
  public ParameterBean() {
    super();
  }
  
  @Override
  public String toString() {
    return "ParameterBean [silhouette=" + silhouette + ", neckline=" + neckline + ", backline="
        + backline + ", sleeves=" + sleeves + ", cloth=" + cloth + ", border=" + border
        + ", embroidery=" + embroidery + "]";
  }

  
}

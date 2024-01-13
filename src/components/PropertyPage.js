import React from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './PropertyPage.css';

const PropertyPage = ({ propertyData }) => {
  const { id } = useParams();
  const property = propertyData.properties.find((prop) => prop.id === id);

  if (!property) {
    return <div>Property not found.</div>;
  }

const images = property.images.map((img) => ({
  original: process.env.PUBLIC_URL + '/' + img,
  thumbnail: process.env.PUBLIC_URL + '/' + img,
}));

const customWidth = '500'; 
const customHeight = '450px'; 

const resizedImages = images.map((img) => ({
  ...img,
  originalWidth: customWidth,
  originalHeight: customHeight,
}));

  return (
    <div className="property-page">
      <h2>{property.location}</h2>

      <ImageGallery items={resizedImages} className='gallery' />

      <div className="property-info">
        <p>{property.type}</p>
        <p>Price: {property.price}</p>
      </div>

      <Tabs>
        <TabList>
          <Tab>Long Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Google Map</Tab>
        </TabList>

        <TabPanel>
          <p>{property.description}</p>
        </TabPanel>
        <TabPanel>
          <ImageGallery items={[{ original: process.env.PUBLIC_URL + '/' + property.floorPlanImage }]} />
        </TabPanel>
        <TabPanel>
        <iframe
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(property.location)}`}
          allowFullScreen
          title="Google Map"
        ></iframe>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyPage;

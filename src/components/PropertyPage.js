import React from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './PropertyPage.css';

const PropertyPage = ({ propertyData }) => {
  // Extract the property ID from the route parameters
  const { id } = useParams();

  // Find the property in propertyData based on the ID
  const property = propertyData.properties.find((prop) => prop.id === id);

  if (!property) {
    return <div>Property not found.</div>;
  }

  // Prepare images for the ImageGallery component
  const images = property.images.map((img) => ({
    original: process.env.PUBLIC_URL + '/' + img, // constructing the correct absolute path to images
    thumbnail: process.env.PUBLIC_URL + '/' + img,
  }));

  // Set custom width and height for images in the ImageGallery
  const customWidth = '500';
  const customHeight = '450px';

  // Resize images using custom width and height
  const resizedImages = images.map((img) => ({
    ...img,
    originalWidth: customWidth,
    originalHeight: customHeight,
  }));

  return (
    <div className="property-page">
      {/* Display the location of the property as the heading */}
      <h2>{property.location}</h2>

      {/* Display images of the property using the ImageGallery component */}
      <ImageGallery items={resizedImages} className='gallery' />

      {/* Display property information */}
      <div className="property-info">
        <p>{property.type}</p>
        <p>Price: {property.price}</p>
      </div>

      <Tabs>
        <TabList>
          {/* Tabs */}
          <Tab>Long Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Google Map</Tab>
        </TabList>

        {/* TabPanel for Long Description */}
        <TabPanel>
          <p>{property.description}</p>
        </TabPanel>

        {/* TabPanel for Floor Plan */}
        <TabPanel>
          <ImageGallery items={[{ original: process.env.PUBLIC_URL + '/' + property.floorPlanImage }]} />
        </TabPanel>

        {/* TabPanel for Google Map */}
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

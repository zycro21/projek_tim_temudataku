import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed mentoring services data
 */
async function seedMentoringServices() {
  try {
    console.log('Seeding mentoring services...');

    // Get existing mentor profiles to link services to
    const mentorProfiles = await prisma.mentorProfile.findMany();

    if (mentorProfiles.length === 0) {
      console.log('No mentor profiles found. Please run seed-mentor.ts first.');
      return;
    }

    // Check if there are already services
    const existingServices = await prisma.mentoringService.count();
    if (existingServices > 0) {
      console.log(`Found ${existingServices} existing services. Skipping service creation.`);
      return;
    }

    // Service types
    const serviceTypes = ['one-on-one', 'group', 'bootcamp', 'shortclass', 'live class'];
    
    // Service templates
    const serviceTemplates = [
      {
        name: 'Data Science Fundamentals',
        description: 'Learn the basics of data science including statistics, Python programming, and data visualization.',
        prices: [750000, 1000000, 1500000],
        durations: [7, 14, 30]
      },
      {
        name: 'Machine Learning Bootcamp',
        description: 'Comprehensive bootcamp covering supervised and unsupervised learning, neural networks, and model deployment.',
        prices: [1500000, 2000000, 2500000],
        durations: [14, 30, 60]
      },
      {
        name: 'Data Visualization Masterclass',
        description: 'Master the art of data visualization using tools like Matplotlib, Seaborn, and Tableau.',
        prices: [500000, 750000, 1000000],
        durations: [5, 10, 14]
      },
      {
        name: 'Deep Learning Specialization',
        description: 'Advanced deep learning concepts including CNNs, RNNs, transformers, and GANs.',
        prices: [2000000, 2500000, 3000000],
        durations: [30, 60, 90]
      },
      {
        name: 'Python for Data Analysis',
        description: 'Learn how to use Python for data analysis with pandas, NumPy, and other libraries.',
        prices: [650000, 850000, 1200000],
        durations: [7, 14, 21]
      },
      {
        name: 'Natural Language Processing',
        description: 'Explore text processing, sentiment analysis, text generation, and language models.',
        prices: [1200000, 1800000, 2200000],
        durations: [14, 30, 45]
      },
      {
        name: 'Data Engineering Basics',
        description: 'Introduction to data pipelines, ETL processes, and cloud data solutions.',
        prices: [900000, 1500000, 2000000],
        durations: [10, 21, 30]
      }
    ];

    // Create services for each mentor
    let serviceCount = 0;
    const timestamp = Math.floor(Date.now() / 1000);

    for (const mentor of mentorProfiles) {
      // Each mentor offers 2-5 services
      const numServices = Math.floor(Math.random() * 4) + 2; 
      
      for (let i = 0; i < numServices; i++) {
        // Select a random service template
        const templateIndex = Math.floor(Math.random() * serviceTemplates.length);
        const template = serviceTemplates[templateIndex];
        
        // Select random values from the template
        const priceIndex = Math.floor(Math.random() * template.prices.length);
        const price = template.prices[priceIndex];
        const duration = template.durations[priceIndex];
        
        // Select a random service type
        const serviceType = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
        
        // For group services or bootcamps, add max participants
        let maxParticipants: number | undefined = undefined;
        if (serviceType === 'group' || serviceType === 'bootcamp' || serviceType === 'shortclass' || serviceType === 'live class') {
          maxParticipants = Math.floor(Math.random() * 20) + 5; // 5-25 participants
        }
        
        // Create the service
        const serviceId = timestamp + serviceCount;
        
        await prisma.mentoringService.create({
          data: {
            id: serviceId,
            mentor_id: mentor.id,
            service_name: `${template.name} - ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}`,
            description: template.description,
            price: new Prisma.Decimal(price),
            service_type: serviceType,
            max_participants: maxParticipants,
            duration_days: duration,
            is_active: Math.random() > 0.1, // 90% active
          }
        });
        
        console.log(`Created service: ${template.name} - ${serviceType} for mentor ID ${mentor.id}`);
        serviceCount++;
      }
    }

    console.log(`Seeding completed! Created ${serviceCount} mentoring services.`);
  } catch (error) {
    console.error('Error seeding mentoring services:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedMentoringServices()
  .catch((error) => {
    console.error('Error during seeding:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
'use client';

import { Button } from '@/components/Button';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useTheme } from '@/components/ThemeProvider';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/Card';
import { Accordion, ControlledAccordion, ControlledAccordionItem } from '@/components/Accordion';
import { Alert, SolidAlert } from '@/components/Alert';

export default function Home() {
  const { theme, themeType } = useTheme();

  const faqItems = [
    {
      title: "What is this theme system?",
      children: "This is a multi-theme system with 5 themes: Matcha Green (light), Cherry Red (dark), Blossom Pink (light), Sky Blue (light), and Teal Green (dark). Each theme has optimized contrast ratios for better readability."
    },
    {
      title: "How do I switch themes?",
      children: "Use the theme switcher buttons above to cycle through different themes. The system automatically detects if a theme is light or dark mode and adjusts accordingly."
    },
    {
      title: "Are the components accessible?",
      children: "Yes! All components follow WCAG guidelines with proper contrast ratios, focus indicators, and keyboard navigation support."
    },
    {
      title: "Can I use these in production?",
      children: "Absolutely! These components are built with best practices and are fully customizable to match your brand."
    }
  ];

  return (
    <main className="min-h-screen p-8 bg-background text-foreground">
      <ThemeSwitcher />
      
      <div className="mt-8 space-y-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Component Library</h1>
          <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Active: {theme} ({themeType})
          </div>
        </div>

        {/* Alert Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Alerts</h2>
          
          {/* Regular Alerts */}
          <div className="space-y-3">
            <Alert variant="info" title="Information">
              This is an info alert with improved contrast for better readability.
            </Alert>
            
            <Alert variant="success" title="Success">
              Your changes have been saved successfully.
            </Alert>
            
            <Alert variant="warning" title="Warning">
              Please review your input before submitting.
            </Alert>
            
            <Alert variant="error" title="Error">
              There was a problem processing your request.
            </Alert>
          </div>

          {/* With Close Button */}
          <div className="space-y-3">
            <Alert 
              variant="info" 
              title="Dismissible Alert"
              onClose={() => alert('Close clicked - in production this would dismiss the alert')}
            >
              This alert can be closed by clicking the X button.
            </Alert>
          </div>

          {/* Solid Alerts */}
          <h3 className="text-lg font-medium mt-6">Solid Variant</h3>
          <div className="space-y-3">
            <SolidAlert variant="info" title="Information">
              Solid alert with bold colors and white text.
            </SolidAlert>
            
            <SolidAlert variant="success" title="Success">
              Solid success alert for important confirmations.
            </SolidAlert>
            
            <SolidAlert variant="warning" title="Warning">
              Solid warning alert for critical warnings.
            </SolidAlert>
            
            <SolidAlert variant="error" title="Error">
              Solid error alert for fatal errors.
            </SolidAlert>
          </div>
        </section>

        {/* Accordion Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Accordion</h2>
          
          {/* Single Accordion */}
          <div>
            <h3 className="text-lg font-medium mb-2">Single Open (FAQ)</h3>
            <Accordion 
              items={faqItems} 
              type="single"
              defaultOpen={["What is this theme system?"]}
            />
          </div>

          {/* Multiple Accordion */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Multiple Open</h3>
            <Accordion 
              items={[
                {
                  title: "Feature 1: Theme System",
                  children: "Five professionally designed themes with light/dark mode support."
                },
                {
                  title: "Feature 2: Components",
                  children: "Complete set of accessible components including Cards, Alerts, and Accordions."
                },
                {
                  title: "Feature 3: Customization",
                  children: "Easy to customize with CSS variables and Tailwind CSS classes."
                }
              ]} 
              type="multiple"
              defaultOpen={["Feature 1: Theme System", "Feature 2: Components"]}
            />
          </div>

          {/* Controlled Accordion */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Controlled Accordion (Programmatic)</h3>
            <ControlledAccordion type="single" value={["item1"]}>
              <ControlledAccordionItem value="item1" title="Programmatic Control">
                This accordion can be controlled programmatically via state.
              </ControlledAccordionItem>
              <ControlledAccordionItem value="item2" title="External State">
                Perfect for when you need to sync accordion state with other components.
              </ControlledAccordionItem>
              <ControlledAccordionItem value="item3" title="Disabled Item" disabled>
                This item is disabled and cannot be opened.
              </ControlledAccordionItem>
            </ControlledAccordion>
          </div>
        </section>

        {/* Combined Example */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Combined Example</h2>
          <Card variant="elevated" className="p-6">
            <CardHeader>
              <CardTitle>Theme Information</CardTitle>
              <CardDescription>
                Current theme: {theme} ({themeType} mode)
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Alert variant="info" className="mb-4">
                This card contains both alerts and accordion components.
              </Alert>
              
              <Accordion 
                items={[
                  {
                    title: "Theme Details",
                    children: `The ${theme} theme is a ${themeType} mode theme with optimized contrast ratios.`
                  },
                  {
                    title: "Accessibility Notes",
                    children: "All color combinations meet WCAG AA standards for text contrast."
                  },
                  {
                    title: "Customization",
                    children: "You can customize these themes by modifying the CSS variables in globals.css"
                  }
                ]}
                type="multiple"
              />
            </CardContent>
            
            <CardFooter className="flex gap-2">
              <Button variant="outline">Learn More</Button>
              <Button>Get Started</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
}
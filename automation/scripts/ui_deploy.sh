echo "Deploy to aws assets location..."
cp -a ../../ui/build ../../aws/
echo "deploy successful 🏁"
echo "Cleaning source (build) folders..."
rm -rf ../../ui/build
echo "completed clean up (UI src folder)! 🏁"

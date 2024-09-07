/**
 * Creates 2 public S3 buckets
 * For storing image assets 
 * For storing order assets 
 */
import { CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket, BucketAccessControl, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';


export class AssetsStack extends Stack {
    private readonly _imageBucketInstance: Bucket;
    private readonly _fileBucketIstance: Bucket;

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        // Creating 1: images s3 bucket
        this._imageBucketInstance = new Bucket(this, 'MannaAppImagesS3', {
            encryption: BucketEncryption.S3_MANAGED,
            bucketName: 'manna-app-images-bucket',
            publicReadAccess: true,
            blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
            accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
            removalPolicy: RemovalPolicy.DESTROY
        });

        // Creating 2: files, orders s3 bucket
        this._fileBucketIstance = new Bucket(this, 'MannaAppFilesS3', {
            encryption: BucketEncryption.S3_MANAGED,
            bucketName: 'manna-app-files-bucket',
            publicReadAccess: true,
            blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
            accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
            removalPolicy: RemovalPolicy.DESTROY
        })
                
        
        // output cfn - bucket name
        new CfnOutput(this, 'MannaAppImagesS3NameExport', {
            value: this._imageBucketInstance.bucketName,
            exportName: 'MannaAppImagesS3Name'
        });

        // output cfn - bucket url
        new CfnOutput(this, 'MannaAppImagesS3URLExport', {
            value: this._imageBucketInstance.bucketWebsiteUrl,
            exportName: 'MannaAppImagesS3URL'
        });

        // output cfn - bucket name
        new CfnOutput(this, 'MannaAppFilesS3NameExport', {
            value: this._fileBucketIstance.bucketName,
            exportName: 'MannaAppFilesS3Name'
        });

        // output cfn - bucket url
        new CfnOutput(this, 'MannaAppFilesS3URLExport', {
            value: this._fileBucketIstance.bucketWebsiteUrl,
            exportName: 'MannaAppFilesS3URL'
        });
    }

    // getters
    public get imageBucketInstance() { return this._imageBucketInstance; }
    public get filesBucketInstance() { return this._fileBucketIstance; }
}